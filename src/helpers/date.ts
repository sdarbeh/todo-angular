// https://momentjs.com/docs/
import moment from "moment";

export const convertDate = (date: string) => moment(date).format('MMMM Do YYYY, h:mm a');
export const timeAgo = (date: string) => moment(date).fromNow();