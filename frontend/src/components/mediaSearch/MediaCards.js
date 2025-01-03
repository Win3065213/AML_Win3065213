export default function Card({ mediaList }) {
    // console.log("data: ",media);
    return (
        <div className="mt-5">
            {mediaList.length === 0 ? (
                <p className="text-xl font-bold">No media found.</p>
                ) : (
                <div>
                    <p className="text-xl font-bold pb-3">{mediaList.length} media found.</p>
                    <ul className="space-y-4">
                        {mediaList.map((media) => (
                            <li key={media.mediaID} className=" border-2 border-gray-500 dark:border-current
                                                                p-4 rounded-lg
                                                                hover:shadow-lg hover:shadow-neutral-500">
                                <h3 className="text-3xl font-bold">{media.mediaName}</h3>
                                <p><span className="font-semibold">Creator:</span> {media.creator}</p>
                                <p><span className="font-semibold">Publisher:</span> {media.publisher}</p>
                                <p><span className="font-semibold">Type:</span> {media.mediaType[0].toUpperCase()}{media.mediaType.slice(1)}</p>
                                <p><span className="font-semibold">Year:</span> {media.year}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
  
  