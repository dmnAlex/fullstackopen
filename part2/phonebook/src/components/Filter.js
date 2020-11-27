const Filter = ({ newSearch, handleChangeSearch }) => (
    <div>
        filter shown with: <input value={newSearch} onChange={handleChangeSearch} />
    </div>
)

export default Filter