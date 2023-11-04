function HashtagCover({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <div>
      {words.map((word, index) => {
        if (word.includes('#')) {
          return (
            <span key={index} className="tw-text-blue-500">
              {word} &nbsp;
            </span>
          );
        }
        return word + ' ';
      })}
    </div>
  );
}

export default HashtagCover;
