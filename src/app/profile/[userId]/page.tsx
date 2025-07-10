
export default async function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return (
    <div>User:
      <span className="text-blue-500 ml-2">{userId}</span>
    </div>
  )
}
