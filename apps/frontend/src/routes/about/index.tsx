import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>
        Primarily a monorepo project to learn, understand, and build a fullstack
        solution for Project Management. Currently utilizing the following
        technology stack:
      </div>
      <ul className="list-disc pl-5">
        <ul className="list-disc pl-5">
          <li>Backend:</li>
          <ul className="list-disc pl-5">
            <li>NestJS</li>
            <li>Prisma</li>
            <li>Postgres</li>
          </ul>
        </ul>
        <ul className="list-disc pl-5">
          <li>Frontend:</li>
          <ul className="list-disc pl-5">
            <li>React</li>
            <li>TanStack:</li>
            <ul className="list-disc pl-5">
              <li>Router</li>
              <li>Query</li>
              <li>Table</li>
            </ul>
            <li>TailwindCSS</li>
          </ul>
        </ul>
      </ul>
    </div>
  );
}
