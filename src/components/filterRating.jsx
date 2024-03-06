import { useState } from "react";
import { Button } from "antd";
export default function FilterRatingFn({
  newChat,
  setNewChat,
  SetIndividualMessages,
}) {
  const [open, setOpen] = useState(false);
  const a = localStorage.getItem("filterRatings")
    ? JSON.parse("[" + localStorage.getItem("filterRatings").slice(1) + "]")
    : null;
  const handleMessages = (m) => {
    SetIndividualMessages(m);
    setOpen(true);
    setNewChat(false);
  };
  return (
    <div className="flex">
      <table className="table-auto w-full border-separate border-spacing-y-2 ">
        <thead>
          <tr>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Conversation</th>
          </tr>
        </thead>
        <tbody>
          {a &&
            a.map((item, i) => {
              return (
                <tr key={i} className="">
                  <td className="bg-slate-100 p-2 mb-3 text-center">
                    {item.rating ? item.rating : "-"}
                  </td>
                  <td className="bg-slate-100 p-2 mb-3 text-center">
                    {item.feedback ? item.feedback : "-"}
                  </td>
                  <td className="bg-slate-100 p-2 mb-3 text-center">
                    <Button
                      type="dashed"
                      onClick={() => {
                        handleMessages(item.messages);
                      }}
                    >
                      Messages
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
