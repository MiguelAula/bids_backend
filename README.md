# KUUPANDA BIDS TEST

### RUN BACKEND INSTRUCTIONS
```
npm install # if not done yet
npm start
```

### RUN TESTS INSTRUCTIONS
```
npm install # if not done yet
npm test
```

### NOTE: 
There is an unlikely but important concern left unadressed in this solution:

- What happens if there are concurrent petitions from the same user? The cache that is serving as database would likely need an atomic get-set operation to ensure data integrity. A concurrency test should be added to check this case.