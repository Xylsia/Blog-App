package com.example.springblog.repository;

import com.example.springblog.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Long> {

    public Role findRoleByName(String name);
}
