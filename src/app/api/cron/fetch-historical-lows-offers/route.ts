import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    console.log("Hello World");
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
};

