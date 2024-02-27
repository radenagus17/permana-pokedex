import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function SkeletonCards() {
  return (
    <article className="py-10">
      <section className="container mx-auto">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xl:gap-7 gap-5">
          {Array.from({ length: 8 }, (v, i) => i).map((el: number) => (
            <Card key={el} className="w-[280px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </article>
  );
}
