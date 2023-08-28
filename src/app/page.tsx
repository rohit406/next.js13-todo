import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany()
}
export default async function Home() {

  async function toggleTodo(id: string, complete: boolean) {
    'use server'
    await prisma.todo.update({ where: { id }, data: { complete } })


  }
  const todos = await getTodos()
  return <>

    <header className="flex justify-between items-center mb-4 ">
      <h1 className="text-xl ">Todo list</h1>
      <Link href={'/new'} className="border border-green-400 rounded-sm px-2 py-1 hover:bg-slate-950 focus-within:bg-slate-950 outline-none">New</Link>
    </header>
    <ul className="pl-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
      ))}
    </ul>


  </>
}