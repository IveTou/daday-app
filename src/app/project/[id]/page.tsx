import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function Project({ params }:{ params: Params}) {
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
