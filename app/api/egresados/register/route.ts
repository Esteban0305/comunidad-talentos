
export async function POST(req: Request) {
  // Handle the POST request here
  const data = await req.json();
  console.log('Received data:', data);
  return Response.json({ message: 'Hello from Next.js!' });
}