
import { PaginationNav1 } from "./PaginationNav1";

function PaginationNav1Presentation({pageIndex,pageCount,setPageIndex}:any) {

  return (
    <div className="flex gap-3 flex-wrap p-6 py-12">
      <PaginationNav1
        gotoPage={setPageIndex}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < pageCount - 1}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </div>
  );
}

export { PaginationNav1Presentation };
