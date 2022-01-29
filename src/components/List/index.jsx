import Item from "../Item";
import "./index.css";

function List(props) {
  return props.todos.map((item) => {
    return <Item key={item.id} {...item} />;
  });
}

export default List;
