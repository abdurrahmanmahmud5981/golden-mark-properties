import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { Unit } from "@/models/Unit";
import projectsData from "../../../../projects-seed.json";
import unitsData from "../../../../units-seed.json";

export async function GET() {
  try {
    await connectDB();

    let projectsAdded = 0;
    let unitsAdded = 0;

    for (const pData of projectsData) {
      // Check if project exists by slug
      let project = await Project.findOne({ slug: pData.slug });
      
      if (!project) {
        project = await Project.create(pData);
        projectsAdded++;
      }

      // Find units for this project
      const projectUnits = unitsData.filter((u: any) => u.projectSlug === pData.slug);
      
      for (const uData of projectUnits) {
        // Check if unit exists for this project by unitNumber
        const existingUnit = await Unit.findOne({ 
          project: project._id, 
          unitNumber: uData.unitNumber 
        });

        if (!existingUnit) {
          // Destructure to remove projectSlug and get the rest of the unit fields
          const { projectSlug, ...unitPayload } = uData as any;
          await Unit.create({
            ...unitPayload,
            project: project._id
          });
          unitsAdded++;
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully!",
      projectsAdded,
      unitsAdded
    });

  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
