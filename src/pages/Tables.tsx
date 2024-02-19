import Breadcrumb from '../components/Breadcrumb';
import WebTable from '../components/tables/WebTable';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <WebTable />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
