import { Task } from "../../interface/task";
import { PriorityIcon } from "../../static/PriorityIcon";
import { formatDate } from "@/functions/formatDate";
import { ModalFormIcon } from "@/static/ModalFormIcon";

interface detailsProps {
  onClose: () => void;
  selectedTask: Task | null;
  isDue: (task: Task) => boolean;
}

// updateTask = this.handleRequest(async (req) => {
//   const paramsId = req.params._id;
//   const {
//     content,
//     assignedTime,
//     priority,
//     routine,
//     areaOfFocus,
//     alarm,
//     archived,
//     note,
//     weekday,
//   }: UpdateTaskPayload = req.body;

export const DetailsModal = ({
  onClose,
  selectedTask,
  isDue,
}: detailsProps) => {
  let fill;
  switch (selectedTask!.priority) {
    case "1st":
      fill = "fill-red-600";
      break;
    case "2nd":
      fill = "fill-yellow-600";
      break;
    case "3rd":
      fill = "fill-blue-600";
      break;
    case "4th":
      fill = "fill-gray-200";
      break;
  }
  console.log(selectedTask!.priority);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 h-8/12 bg-white rounded-xl shadow-lg">
        <section>
          <div className="bg-stone-900 rounded-t-xl flex opacity-90 items-center justify-between p-4">
            <h3 className="text-gray-400 font-semibold flex items-center fill-red-600">
              <ModalFormIcon />
              <span>Task Details</span>
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 font-semibold px-3 py-1 rounded hover:text-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
          <div className="bg-stone-900 text-gray-400 px-5 pb-6 pt-1 rounded-b-xl opacity-90 flex flex-col">
            <div className="p-5">
              <div className="flex flex-row border-b border-gray-500 mb-3 pb-2">
                <span className="font-medium">{selectedTask!.content}</span>
                <a
                  className={`text-sm ${fill} text-gray-400 px-2 ml-3 rounded flex flex-row`}
                >
                  <PriorityIcon />
                  <span className="self-center">{selectedTask!.priority}</span>
                </a>
              </div>
              <div className="flex flex-row border-b border-gray-500 pb-2  mb-2">
                <span className="block">
                  {formatDate(
                    new Date(selectedTask!.assignedTime),
                    selectedTask!.routine
                  )}
                </span>
                {isDue(selectedTask!) && selectedTask!.routine === "nil" && (
                  <span className="ml-3 px-1 bg-red-600 text-gray-200 rounded">
                    Due
                  </span>
                )}
              </div>
              <span className="block mb-2 border-b border-gray-500 pb-2">
                {selectedTask!.alarm ? "Alarm is set" : "No alarm set"}
              </span>
              {selectedTask!.note && (
                <div className="mt-3 border-b border-gray-500 pb-2">
                  <label className="font-semibold">Note:</label>
                  <span className="ml-2">{selectedTask!.note}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
