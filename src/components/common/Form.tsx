import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Paper,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Book } from "src/domain/Book";
import { styled } from "@mui/system";

const StyledActions = styled(Box)(({ theme }) => ({
  marginTop: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 16,
    '& .MuiButton-root': {
      width: "100%",
      marginBottom: 8
    }
  },
}));

const CreateBookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  description: Yup.string().required("Description is required"),
  rating: Yup.number().min(1).max(5).nullable(),
  status: Yup.string().oneOf(["read", "reading", "want to read"]),
});

interface FormValues extends Omit<Book, "id"> {
  isEdit?: boolean;
  onSubmitCallback: (values: Book) => void;
  onCancelCallback: () => void;
}

const Form = ({
  isEdit = false,
  title = "",
  author = "",
  genre = "",
  description = "",
  rating = null,
  status = 'want to read',
  onSubmitCallback,
  onCancelCallback,
}: FormValues) => {
  const formik = useFormik({
    initialValues: {
      title,
      author,
      genre,
      description,
      rating: rating,
      status: status || 'want to read',
    },
    validationSchema: CreateBookSchema,
    onSubmit: (values) => {
      onSubmitCallback(values as Book);
    },
  });

  return (
    <Box padding={4} maxWidth={480} width="100%" component={Paper}>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormControl>
            <TextField
              required
              id="title"
              label="Title"
              margin="dense"
              aria-describedby="title"
              name="title"
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </FormControl>

          <FormControl>
            <TextField
              required
              id="author"
              label="Author"
              margin="dense"
              aria-describedby="author"
              name="author"
              onBlur={formik.handleBlur}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
              onChange={formik.handleChange}
              value={formik.values.author}
            />
          </FormControl>

          <FormControl>
            <TextField
              required
              id="genre"
              label="Genre"
              margin="dense"
              aria-describedby="genre"
              name="genre"
              onBlur={formik.handleBlur}
              error={formik.touched.genre && Boolean(formik.errors.genre)}
              helperText={formik.touched.genre && formik.errors.genre}
              onChange={formik.handleChange}
              value={formik.values.genre}
            />
          </FormControl>

          <FormControl>
            <TextField
              required
              id="description"
              margin="dense"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </FormControl>
          <FormControl>
            <Select
              margin="dense"
              native
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option value="want to read">Want to Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </Select>
          </FormControl>
          <StyledActions>
            <FormControl>
              <Rating
                typeof="number"
                itemType="number"
                name="rating"
                value={formik.values.rating}
                onChange={(_e, value: number | null) => formik.setFieldValue('rating', Number(value))}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <Box>
              <Button
                size="medium"
                style={{ marginRight: 8 }}
                type="button"
                variant="outlined"
                onClick={onCancelCallback}
              >
                Back
              </Button>
              <Button size="medium" type="submit" variant="contained">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Box>
          </StyledActions>
        </FormGroup>
      </form>
    </Box>
  );
};

export default Form;
