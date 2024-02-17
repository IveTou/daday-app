import Link from "next/link";
import prisma from '../../../../lib/prisma';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const getBoard = async (id: string) => {
  const board = await prisma.board.findUnique({
      where: { id: id },
      include: {
        author: {
          select: { profile: true },
        },
        columns: {
          select: {
            name: true,
            order: true,
            project: true
          } 
        }
      },
    });
  
  return board
}

export default async function Board({ params }:{ params: Params}) {
  const data = await getBoard(params.id)
  const { title, author, columns } = data ?? {}

  return (
    <main>
      <div>
        <h1>
          Boards
        </h1>
        <br/>
        <section>
          <h2>Titulo: <span>{title}</span></h2>
          <p>Autor: <span>{author?.profile?.name}</span></p>
        </section>
        <section>
          <ul>
            {columns?.map(({ name, order }) => <li>{name}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
