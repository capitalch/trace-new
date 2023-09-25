import _ from 'lodash'

function LodashTest() {

    return (<div className='m-4'>
        <button onClick={handleInter}>Intersection</button>
    </div>)

    function handleInter() {
        const arr1 = ['afe97b8b-cb4a-492a-f915-08db9522c85d'
            , '119b8bd2-9dda-41ec-117d-08db973641f5'
            , 'ba67ef4d-1734-4a00-9b71-08dba4136a65'
            , 'fd6a2675-2616-4cc0-9b77-08dba4136a65'
            , '7f07370e-ef59-4bdd-9f64-08dba4136a65'
            , 'de23abe1-9f37-45ab-95e5-08dba4136a65'
        ]
        const arr2 = ['afe97b8b-cb4a-492a-f915-08db9522c85d'
            , '119b8bd2-9dda-41ec-117d-08db973641f5'
            , '9f4b795f-0d64-4415-117e-08db973641f5'
            , '774d412a-f732-4318-117f-08db973641f5'
            , '69ff7639-549d-4b0c-1180-08db973641f5'
            , '612ff228-75c2-45b2-95e3-08dba4136a65'
            , '46a8687b-4387-4b7d-95e4-08dba4136a65'
            , 'de23abe1-9f37-45ab-95e5-08dba4136a65']
        const interArray = _.intersection(arr1, arr2);
        console.log(interArray)
    }
}
export { LodashTest }