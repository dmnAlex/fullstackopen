const PersonForm = ({ newName, newNumber, handleAddPerson, handleChangeName, handleChangeNumber }) => (
    <form onSubmit={handleAddPerson}>
        <div>
            name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm