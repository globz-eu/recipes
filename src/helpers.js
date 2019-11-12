export default data => {
  const addForPersons = data.map(datum => ({ servings: datum.for_persons, ...datum }))
  return addForPersons.map(datum => { 
    delete datum.for_persons
    return datum
  })
}
