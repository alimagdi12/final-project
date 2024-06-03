import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomSelect from './CustomSelect';

const names = [];

export default function ScheduleListing() {
    const [groupings, setGroupings] = useState(Array(names.length).fill(''));

    const handleGroupingChange = (index) => (value) => {
        setGroupings(prevGroupings => {
            const newGroupings = [...prevGroupings];
            newGroupings[index] = value;
            return newGroupings;
        });
    };

    return (
        <>
            <Box sx={{ width: '75%', textAlign: 'start', border: '2px solid #ccc', padding: "20px", borderRadius: '15px', marginY: 4 }}>
                <Typography variant='h6' sx={{ marginBottom: 1 }}>Schedule your listing</Typography>
                <Typography sx={{ marginBottom: 3 }}>Your listing goes live immediately, unless you select a time and date you want it to start</Typography>
                
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography sx={{ marginBottom: 1 }}>Item Title</Typography>
                        <CustomSelect
                            key={name}
                            label={`Grouping ${6}`}
                            value={groupings[6]}
                            width={300}
                            onChange={handleGroupingChange(6)}
                            options={[
                                { value: '', label: 'None' },
                                { value: 1, label: 'Option 1' },
                                { value: 2, label: 'Option 2' },
                                { value: 3, label: 'Option 3' },
                                { value: 4, label: 'Option 4' }
                            ]}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ marginBottom: 1 }}>Item Title</Typography>
                        <CustomSelect
                            key={name}
                            label={`Grouping ${4}`}
                            value={groupings[4]}
                            onChange={handleGroupingChange(4)}
                            options={[
                                { value: '', label: 'None' },
                                { value: 1, label: 'Option 1' },
                                { value: 2, label: 'Option 2' },
                                { value: 3, label: 'Option 3' },
                                { value: 4, label: 'Option 4' }
                            ]}
                            width={100}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ marginBottom: 1 }}>Item Title</Typography>
                        <CustomSelect
                            width={100}
                            key={name}
                            label={`Grouping ${6}`}
                            value={groupings[6]}
                            onChange={handleGroupingChange(6)}
                            options={[
                                { value: '', label: 'None' },
                                { value: 1, label: 'Option 1' },
                                { value: 2, label: 'Option 2' },
                                { value: 3, label: 'Option 3' },
                                { value: 4, label: 'Option 4' }
                            ]}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ marginBottom: 1 }}>Item Title</Typography>
                        <CustomSelect
                            width={100}
                            key={name}
                            label={`Grouping ${6}`}
                            value={groupings[6]}
                            onChange={handleGroupingChange(6)}
                            options={[
                                { value: '', label: 'None' },
                                { value: 1, label: 'Option 1' },
                                { value: 2, label: 'Option 2' },
                                { value: 3, label: 'Option 3' },
                                { value: 4, label: 'Option 4' }
                            ]}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
