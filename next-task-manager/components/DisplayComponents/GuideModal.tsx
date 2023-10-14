import { ModalFormIcon } from "@/static/ModalFormIcon";

interface guideProps {
  onClose: () => void;
}

export const GuideModal = ({ onClose }: guideProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-7/12 h-8/12 bg-white rounded-xl shadow-lg">
        <section>
          <div className="bg-stone-900 rounded-t-xl flex opacity-90">
            <h3 className="text-gray-400 font-semibold p-3 flex items-center fill-red-600">
              <ModalFormIcon />
              <span>Guideline on the filters</span>
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 font-semibold px-3 py-1 rounded hover:text-red-600 ml-auto mr-7 transition duration-300"
            >
              Close
            </button>
          </div>
          <div className="bg-stone-900 text-gray-400 px-5 pb-6 pt-1 rounded-b-xl opacity-90">
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">All Tasks : </span>
              <span>Display all tasks</span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Today : </span>
              <span>All tasks assigned for today.</span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Today&apos;s Objective : </span>
              <span>All 1st priority tasks assigned for today.</span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Today&apos;s Focus : </span>
              <span>
                All tasks assigned for today except 4th priority tasks.
              </span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Tomorrow&apos;s Focus : </span>
              <span>
                All tasks assigned for tomorrow except 4th priority tasks.
              </span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">This Week&apos;s Focus : </span>
              <span>
                All tasks assigned for this week except 4th priority tasks.
              </span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Recurring Focus Areas : </span>
              <span>Areas you are focusing on.</span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Routines : </span>
              <span>All recurring tasks.</span>
            </div>
            <div className="border-b border-gray-500 mb-3 pb-2">
              <span className="font-medium">Archived : </span>
              <span>All completed tasks.</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
