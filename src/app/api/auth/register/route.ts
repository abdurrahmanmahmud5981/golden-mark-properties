import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "সব তথ্য সঠিকভাবে দিন।" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে।" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "নিবন্ধন সফল হয়েছে।" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "সার্ভার সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
