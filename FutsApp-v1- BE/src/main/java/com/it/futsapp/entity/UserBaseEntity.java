package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@MappedSuperclass
public class UserBaseEntity {
    @Column(name = "CREATION_DATE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "LAST_UPDATE", nullable = true)
    private Date updateAt;



    @PrePersist
    @PreUpdate
    protected void beforeSave() {
        if (createAt == null) {
            setCreateAt(new Date());
        } else {
            setUpdateAt(new Date());
        }
    }
}
