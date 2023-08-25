function CategoryFilter(props) {
  return (
    <aside>
      <ul className="categories">
        <li>
          <button
            className="btn btn-category category-all"
            value="All"
            onClick={(evt) => props.selectCategory(evt.target.value)}
            style={{ background: "#8b5cf6" }}
          >
            All
          </button>
        </li>

        {props.categories.map((tag) => (
          <li>
            <button
              key={tag.name}
              className="btn btn-category"
              value={tag.name}
              onClick={(evt) => props.selectCategory(evt.target.value)}
              style={{ background: tag.color }}
            >
              {tag.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
