import Link from "next/link";
import prisma from '../../lib/prisma/prisma';
import { getSession } from '@auth0/nextjs-auth0';


const getBoards = async () => {
  const board = await prisma.board.findMany({
      include: {
        author: {
          select: { name: true },
        },
      },
    });

  return board
}

const getUser = async () => {//Transform this on a custom hook and store user into a redux store
  'use server'

  const session = await getSession();
  const user = await prisma.user.findUnique(({
    where: { id: String(session?.user.su) },
  }))

  return user
}

export default async function Boards() {
  const user = await getUser()
  const data = await getBoards()

  if(!user) {
    return (
      <>
        <h2>You need a profile to create and see Boards</h2>
        <Link href='/profile/create'>Create a User Profile</Link>
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
