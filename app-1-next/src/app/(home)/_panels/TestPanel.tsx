"use client";

import React from "react";

import { usePanelActions } from "@/shared/layouts/panel-system/PanelStackContext";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const TestPanel: React.FC = () => {
  const { pop } = usePanelActions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-4xl font-bold mb-8">Shadcn UI Test Page</h1>

      <Card className="w-[350px] mb-8">
        <CardHeader>
          <CardTitle>Welcome to Shadcn UI</CardTitle>
          <CardDescription>This is a test card to showcase Shadcn components.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You can see a button below:</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Learn More</Button>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>

      <Button variant="destructive" onClick={pop}>
        Go Back
      </Button>
    </div>
  );
};

export default TestPanel;
