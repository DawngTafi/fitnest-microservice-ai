import { Box, duration, FormControl, InputLabel, Select, TextField, MenuItem, Button} from "@mui/material";
import React, { use, useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {

    const [activity, setActitvity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrics: {}
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addActivity(activity);
            onActivityAdded();
            setActitvity({ type: "RUNNING", duration: '', caloriesBurned: '' });
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <FormControl fullWidth sx = {{mb: 2}}>
            <InputLabel>Activity Type</InputLabel>
            <Select
                value={activity.type}
                onChange={(e) => setActitvity({...activity, type: e.target.value})}>
                    <MenuItem value="RUNNING">Running</MenuItem>
                    <MenuItem value="WALKING">Walking</MenuItem>
                    <MenuItem value="CYCLING">Cycling</MenuItem>
                </Select>
        </FormControl>
        <TextField fullWidth
            label="Duration (minutes)" 
            type="number"
            sx={{ mb: 2 }}
            value={activity.duration}
            onChange={(e) => setActitvity({...activity, duration: e.target.value})}/>
        <TextField fullWidth
            label="Calories Burned" 
            type="number"
            sx={{ mb: 2 }}
            value={activity.caloriesBurned}
            onChange={(e) => setActitvity({...activity, caloriesBurned: e.target.value})}/>
        <Button type="submit" variant='contained'>
            Add Activity
        </Button>
        </Box>
    )
}

export default ActivityForm;