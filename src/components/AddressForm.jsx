// frontend/src/components/AddressForm.jsx

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Box,
    Typography,
    Popper,
    Paper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Grow,
    Divider
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { provinces } from '../data/provinces';

const AddressForm = ({ address, province, district, onAddressChange, onProvinceChange, onDistrictChange }) => {
    // ສະຖານະສຳລັບການເປີດເມນູ
    const [openProvinceMenu, setOpenProvinceMenu] = useState(false);
    const [openDistrictMenu, setOpenDistrictMenu] = useState(false);
    const [availableDistricts, setAvailableDistricts] = useState([]);

    // ອ້າງອີງຫາ element ສຳລັບ popper
    const provinceAnchorRef = React.useRef(null);
    const districtAnchorRef = React.useRef(null);

    // ອັບເດດລາຍຊື່ເມືອງເມື່ອເລືອກແຂວງ
    useEffect(() => {
        if (province) {
            const selectedProvince = provinces.find(p => p.name === province);
            if (selectedProvince) {
                setAvailableDistricts(selectedProvince.districts);

                // ຖ້າເມືອງປັດຈຸບັນບໍ່ຢູ່ໃນລາຍຊື່ເມືອງຂອງແຂວງໃໝ່, ລ້າງຄ່າເມືອງ
                if (district && !selectedProvince.districts.includes(district)) {
                    onDistrictChange('');
                }
            }
        } else {
            setAvailableDistricts([]);
            if (district) {
                onDistrictChange('');
            }
        }
    }, [province, district, onDistrictChange]);

    // ເປີດປິດເມນູແຂວງ
    const handleToggleProvinceMenu = () => {
        setOpenProvinceMenu((prevOpen) => !prevOpen);
        if (openDistrictMenu) setOpenDistrictMenu(false);
    };

    // ເປີດປິດເມນູເມືອງ
    const handleToggleDistrictMenu = () => {
        if (!province) return; // ບໍ່ສາມາດເປີດເມນູເມືອງໄດ້ຖ້າຍັງບໍ່ໄດ້ເລືອກແຂວງ
        setOpenDistrictMenu((prevOpen) => !prevOpen);
        if (openProvinceMenu) setOpenProvinceMenu(false);
    };

    // ເລືອກແຂວງ
    const handleProvinceSelect = (provinceName) => {
        onProvinceChange(provinceName);
        setOpenProvinceMenu(false);
    };

    // ເລືອກເມືອງ
    const handleDistrictSelect = (districtName) => {
        onDistrictChange(districtName);
        setOpenDistrictMenu(false);
    };

    // ປິດເມນູເມື່ອຄລິກດ້ານນອກ

    const handleCloseMenus = (event) => {
        if (
            provinceAnchorRef.current?.contains(event.target)
        ) {
            return;
        }
        if (
            districtAnchorRef.current?.contains(event.target)
        ) {
            return;
        }
        setOpenProvinceMenu(false);
        setOpenDistrictMenu(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="ທີ່ຢູ່"
                fullWidth
                value={address}
                onChange={(e) => onAddressChange(e.target.value)}
            />

            <Typography variant="caption" sx={{ mt: 1 }}>
                ແຂວງ
            </Typography>
            <ClickAwayListener onClickAway={handleCloseMenus}>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        value={province || ''}
                        placeholder="-- ເລືອກແຂວງ --"
                        InputProps={{
                            readOnly: true,
                            endAdornment: <ArrowDropDownIcon />
                        }}
                        onClick={handleToggleProvinceMenu}
                        ref={provinceAnchorRef}
                        sx={{
                            cursor: 'pointer',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#079578',
                                },
                            },
                        }}
                    />
                    <Popper
                        open={openProvinceMenu}
                        anchorEl={provinceAnchorRef.current}
                        placement="bottom-start"
                        transition
                        disablePortal
                        style={{ width: provinceAnchorRef.current?.offsetWidth, zIndex: 1300 }}
                    >
                        {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: 'top' }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{ maxHeight: 300, overflow: 'auto' }}
                                >
                                    <MenuList>
                                        <MenuItem onClick={() => handleProvinceSelect('')}>
                                            <em>-- ບໍ່ລະບຸ --</em>
                                        </MenuItem>
                                        <Divider />
                                        {provinces.map((province) => (
                                            <MenuItem
                                                key={province.name}
                                                onClick={() => handleProvinceSelect(province.name)}
                                            >
                                                {province.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
            </ClickAwayListener>

            <Typography variant="caption" sx={{ mt: 1 }}>
                ເມືອງ
            </Typography>
            <ClickAwayListener onClickAway={handleCloseMenus}>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        value={district || ''}
                        placeholder={!province ? "ກະລຸນາເລືອກແຂວງກ່ອນ" : "-- ເລືອກເມືອງ --"}
                        disabled={!province}
                        InputProps={{
                            readOnly: true,
                            endAdornment: <ArrowDropDownIcon />
                        }}
                        onClick={handleToggleDistrictMenu}
                        ref={districtAnchorRef}
                        sx={{
                            cursor: province ? 'pointer' : 'not-allowed',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#079578',
                                },
                            },
                        }}
                    />
                    <Popper
                        open={openDistrictMenu}
                        anchorEl={districtAnchorRef.current}
                        placement="bottom-start"
                        transition
                        disablePortal
                        style={{ width: districtAnchorRef.current?.offsetWidth, zIndex: 1300 }}
                    >
                        {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: 'top' }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{ maxHeight: 300, overflow: 'auto' }}
                                >
                                    <MenuList>
                                        <MenuItem onClick={() => handleDistrictSelect('')}>
                                            <em>-- ບໍ່ລະບຸ --</em>
                                        </MenuItem>
                                        <Divider />
                                        {availableDistricts.map((district) => (
                                            <MenuItem
                                                key={district}
                                                onClick={() => handleDistrictSelect(district)}
                                            >
                                                {district}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

export default AddressForm;