import { parseISO, format } from "date-fns";
import { NextPage } from "next";
const Date: NextPage<{ dateString: string }> = ({
  dateString,
}: {
  dateString: string;
}) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default Date;
