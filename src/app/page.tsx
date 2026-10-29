'use client'

import LateralDayComponent from "@/components/LateralDayComponent";
import { daily } from "@/lib/dataClasses";
import { getCoordinates } from "@/lib/getCoordinates";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  redirect('/0');
}
