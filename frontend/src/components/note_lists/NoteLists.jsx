const NoteLists = ({ lists }) => {
  return (
    <div className="h-80 overflow-y-auto">
      {lists.map((list, idx) => (
        <ul key={`list-${idx}`} className="bg-gray-200 p-4 my-4 rounded-md">
          <li className="text-blue-500 font-bold">
            Title: <span className="text-gray-700">{list.title}</span>
          </li>
          <li className="text-blue-500 font-bold">
            Description:
            <span className="text-gray-700">{list.description}</span>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default NoteLists;
