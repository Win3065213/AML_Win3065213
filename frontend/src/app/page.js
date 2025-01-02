"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/authentication');

  return (
    <div className="App">
      Root page
    </div>
  );
};
