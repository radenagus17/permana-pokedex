import React, { FC } from "react";
import { Card, Skeleton } from "@nextui-org/react";

interface SkeletonCardDetailProps {}

const SkeletonCardDetail: FC<SkeletonCardDetailProps> = ({}) => {
  return (
    <article className="py-12">
      <section className="container mx-auto">
        <Card
          className="max-w-screen-md min-h-[35em] m-auto space-y-5 p-4"
          radius="lg"
        >
          <Skeleton className="rounded-lg">
            <div className="h-[30em] rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        </Card>
      </section>
    </article>
  );
};

export default SkeletonCardDetail;
