import Link from "next/link";
import prisma from '../../shared/lib/prisma/prisma';
import { getSession } from '@auth0/nextjs-auth0';


const getBoards = async () => {
  'use server'
  const session = await getSession()

  const board = await prisma.board.findMany({
      where: { authorId: String(session?.user.su) },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

  return board
}

export default async function Boards(
  { searchParams }
  :
  { searchParams: { [key: string]: string | string[] | undefined } }) {
  const data = await getBoards()
  const { profile } = searchParams


  if(!Boolean(profile)) {
    return (
      <>
        <h2>You need a profile to create and see Boards</h2>
        <Link href='/profile'>Create a User Profile</Link>
      </>
    )
  }


  let boards = data.length
    ? (
      <section>
        {data.map(({ title, author, id }) => (
          <Link href={`/boards/${id}`}>
            <h2>Titulo: <span>{title}</span></h2>
            <p>Autor: <span>{author.name}</span></p>
          </Link>
        ))}
      </section>
    )
    : (
      <>
        <h3>You don't have boards yet!</h3>
        <Link href='/boards/create'>Create your first board</Link>
      </>
    )

  return (
    <main>
      <div>
        <h1>
          Boards
        </h1>
        <br/>
        {boards}
      </div>
    </main>
  );
}
