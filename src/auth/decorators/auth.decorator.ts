import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interface/valid-roles';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export const Auth = (...roles: ValidRoles[]) => {
    if (roles.length === 0) {
        return applyDecorators(
            UseGuards(AuthGuard())
        );
    }
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}
