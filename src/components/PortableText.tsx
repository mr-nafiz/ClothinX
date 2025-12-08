import { PortableText } from "@portabletext/react";

export default function ProductDescription({ description }: any) {
  return (
    <div className="prose max-w-none text-gray-800">
      <PortableText
        value={description}
        components={{
          block: {
            normal: ({ children }) => <p className="mb-4">{children}</p>,
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-2">{children}</h2>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc ml-6 mb-4">{children}</ul>
            ),
          },
          listItem: {
            bullet: ({ children }) => <li className="mb-2">{children}</li>,
          },
        }}
      />
    </div>
  );
}
