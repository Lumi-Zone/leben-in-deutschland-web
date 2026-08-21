interface Props {
    src: string | null | undefined;
    alt: string;
}

export default function QuestionImage({ src, alt }: Props) {
    if (!src) return null;

    return (
        <figure className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <img
                src={src}
                alt={alt}
                className="mx-auto max-h-[32rem] w-full object-contain"
                loading="eager"
                decoding="async"
            />
        </figure>
    );
}
