import * as React from "react";

const Avai = () => {
  const [avail, setAvail] = React.useState([]);
  React.useEffect(() => {
    setInterval(async () => {
      const data = await fetch('http://localhost:3333/getPractitioner');
      let pratData = await data.json();
      setAvail(pratData.availabilities)
    }, 1000)
  }, [])
  return (
    <div style={{
      border: '1px solid blue'
    }}>
      <span>Availabilities:</span>
      {avail.map(a => {
        return <div>{a.startDateTime}</div>
      })}
    </div>
  )
}

export default Avai;