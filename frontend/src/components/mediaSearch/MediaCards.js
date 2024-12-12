export default function Card({ mediaList }) {
    // console.log("data: ",media);
    return (
        <div className="mt-8">
            {mediaList.length === 0 ? (
                <p>No results found.</p>
                ) : (
                <ul className="space-y-4">
                    {mediaList.map((media) => (
                        <li key={media.mediaID} className="border p-4 rounded-lg">
                            <h3 className="text-3xl font-bold">{media.mediaName}</h3>
                            <p><span className="font-semibold">Author:</span> {media.creator}</p>
                            <p><span className="font-semibold">Publisher:</span> {media.publisher}</p>
                            <p><span className="font-semibold">Type:</span> {media.mediaType}</p>
                            <p><span className="font-semibold">Year:</span> {media.year}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
  
  