import Link from "next/link";
import prisma from '../../../lib/prisma';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Board, Column } from "@prisma/client";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

const getBoard = async (id: string) => {
  const board = await prisma.board.findUnique({
      where: { id: id },
      include: {
        author: {
          select: { name: true },
        },
        columns: {
          select: {
            name: true,
            order: true,
            projects: {
              select: { title: true, id: true }
            }
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
          <p>Autor: <span>{author?.name}</span></p>
        </section>
        <section>
          <ul>
            {columns?.map(({ name, order, projects }, index) => (
              <li key={index}>
                <h3><strong>{name}</strong></h3>
                {projects.map(({ title, id }) => <p><Link href={`../project/${id}`}>{title}</Link></p>)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
