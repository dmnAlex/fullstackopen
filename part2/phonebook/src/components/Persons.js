const Persons = ({ persons, handleDeletePerson }) => (
    <div>
        { persons.map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />)}
    </div>
)

const Person = ({ person, handleDeletePerson }) => (
    <p>{person.name} {person.number} <button onClick={() => {handleDeletePerson(person.id, person.name)}}>delete</button></p>
)

export default Persons