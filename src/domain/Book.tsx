import { AutoStories, BookmarkAddedOutlined, BookmarkAddOutlined } from "@mui/icons-material";

type Ratings = 1 | 2 | 3 | 4 | 5;
type Rating = Ratings | null;

export const Read = 'read';
export const Reading = 'reading';
export const WantToRead = 'want to read';

export const statusIcons = {
  [Reading]: <AutoStories />,
  [Read]: <BookmarkAddedOutlined />,
  [WantToRead]: <BookmarkAddOutlined />,
};

export type Status = typeof Read | typeof Reading | typeof WantToRead | null;

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  rating: Rating;
  status: Status;
}
