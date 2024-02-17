import Link from "next/link";
import prisma from '../../../lib/prisma';

const getBoards = async () => {
  const board = await prisma.board.findMany({
      include: {
        author: {
          select: { profile: true },
        },
      },
    });
  
  return board
}

export default async function Boards() {

  const data = await getBoards()

  return (
    <main>
      <div>
        <h1>
          Boards
        </h1>
        <br/>
        <section>
          {data.map(({ title, author, id }) => (
            <Link href={`/boards/${id}`}>
              <h2>Titulo: <span>{title}</span></h2>
              <p>Autor: <span>{author.profile?.name}</span></p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
