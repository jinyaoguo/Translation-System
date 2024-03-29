package com.example.translationsystembackend.entities;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class User implements Serializable {

    static final public int DEFAULT_POINTS = 1000;

    private String username;
    private byte[] passwordDigest;
    private int status;
    private int points;
    private Date created;
    private Date lastLogin;
    private String token;

}
