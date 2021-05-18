import { React, useState } from 'react'
import { Drawer, Button, IconButton, Divider } from '@material-ui/core'
export const FilterPane = (props) => {

    const [toggle, setToggle] = useState(false)
    const toggleDrawer = (open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'shift')) {
        return
      }
      setToggle(open)
    }

    return (
        <div>
          <React.Fragment>
            <Button onClick={toggleDrawer(true)}> right </Button>
            <SwipeableDrawer
              anchor='right'
              open={toggle}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {/* {list(anchor)} */}
            </SwipeableDrawer>
          </React.Fragment>
        ))
      </div>
    )
}