import { getProjects } from "@/lib/actions/project-actions";
import HomeClient from "@/components/home/HomeClient";

export default async function HomePage() {
  const { data: projects } = await getProjects(1, 6);
  
  return <HomeClient projects={projects} />;
}
