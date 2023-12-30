export const getBarChatdata = (data) => {
    let barChatData = [{
        dataKey:'200', label:'200', name: '200', value: data.filter((d) => d.response.status === 200)?.length || 0, color: 'green'
    },
    { dataKey:'404', label:'404', name: '404', value: data.filter((d) => d.response.status === 404)?.length || 0, color: 'blue' },
    { dataKey:'400', label:'400', name: '400', value: data.filter((d) => d.response.status === 400)?.length || 0, color: 'orange' },
    { dataKey:'500', label:'500', name: '500', value: data.filter((d) => d.response.status === 500)?.length || 0, color: 'red' }];

    return barChatData;
}