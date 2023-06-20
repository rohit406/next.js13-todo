
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
//server action
/** server function runs on the server before being sent to the client. client only gets the
  data sent directly from the server
 */
async function createTodo(data: FormData) {
    "use server" //server code keyword

    const title = data.get("title")?.valueOf()
    if (typeof title !== 'string' || title.length === 0) {
        throw new Error('invalid title')
    }

    await prisma.todo.create({
        data: {
            title: title, complete: false
        }
    })
    redirect('/')
    console.log('hi')
}

export default function New() {
    return <>
        <header className="flex justify-between items-center mb-4 ">
            <h1 className="text-xl ">Todos</h1>

        </header>
        <form action={createTodo} className="flex gap-2 flex-col">
            <input type="text" name="title" className="outline-none border border-slate-200 bg-transparent rounded-sm px-2 py-1" />
            <div>
                <Link href='..' className="outline-none border border-slate-200 bg-transparent rounded-sm px-2 py-1"> cancel</Link>
                <button type="submit" className="outline-none border border-slate-200 bg-transparent rounded-sm px-2 py-1 ml-1"> create</button>
            </div>
        </form>
    </>
}