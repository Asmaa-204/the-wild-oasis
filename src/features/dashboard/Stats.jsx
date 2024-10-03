import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, stays, numCabins, numNights }) {
  const sales = bookings.reduce((prev, curr) => prev + curr?.totalPrice, 0);
  const totalNumNights = numCabins * numNights;
  const occupation = Math.round(
    (stays.reduce((prev, curr) => prev + curr.numNights, 0) / totalNumNights) *
      100
  );

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        title="Bookings"
        value={bookings?.length}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        title="check ins"
        value={stays.length}
      />

      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="occupation"
        value={`${occupation}%`}
      />
    </>
  );
}
