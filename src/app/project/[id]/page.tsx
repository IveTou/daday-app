import Link from "next/link";
import prisma from '../../../../lib/prisma';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function Project({ params }:{ params: Params}) {
 
  console.log(params.id)
  return (
    <main>
      <div>
        <h1>
          Project
        </h1>
      </div>
    </main>
  );
}
